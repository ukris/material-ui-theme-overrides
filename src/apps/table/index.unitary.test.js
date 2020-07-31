import React from 'react'
import renderer from 'react-test-renderer'
import { mount, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Table from './index'
import { GlobalContext, TableContext } from 'context'
import { ThemeContext, ThemeProvider } from 'theme'
import { getColumnDefinitionWithDefaults } from './table-defaults'
import backendMockdata from 'mocks/table.json'

configure({ adapter: new Adapter() })

const tableData = {
    ...backendMockdata,
    columns: backendMockdata.columns.map( column => getColumnDefinitionWithDefaults(column))
}

const themeZoom = GlobalContext.themeZoom;
const setThemeZoom = () => true

describe('Table Component | One row', () => {
    const component = (
        <TableContext.Provider
        value={{
          editable: false,
          setEditable: () => false,
          focusedCell: undefined,
          setFocusedCell: () => false
        }}>
        <ThemeContext.Provider value={{ themeZoom, setThemeZoom }}>
            <ThemeProvider>
                <Table columns={tableData.columns} rowsData={tableData.rows} editable={tableData.editable}/>
            </ThemeProvider>
        </ThemeContext.Provider>
      </TableContext.Provider>
    )
    const wrapper = mount(component)
    it('renders component correctly', () => {
        expect(wrapper.find('[data-test="table-container"]').length).toEqual(1)
    });

    it('matches snapshot', () => {
        const tree = renderer.create(component,).toJSON()

        expect(tree).toMatchSnapshot()
    });

    // it('rendered ellipsis component', () => {
    //     expect(wrapper.find('.table-ellipsis-container').length).toEqual(1)
    // });

    // it('rendered progressbar component', () => {
    //     expect(wrapper.find('[data-test="table-progressbar"]').length).toEqual(1)
    // });
    
    // it('rendered tags component', () => {
    //     expect(wrapper.find('.MuiBox-root[data-test="table-tags"]').length).toEqual(1)
    // });
    
    // it('rendered peopledropdown component', () => {
    //     expect(wrapper.find('[data-test="table-peopledropdownselect"]').length).toEqual(1)
    // });
    
    // it('rendered daterangepicker component', () => {
    //     expect(wrapper.find('[data-test="table-daterangepicker"]').length).not.toEqual(0)
    //     expect(wrapper.find('[data-test="table-daterangepicker"]').find('input').length).toEqual(1)
    // });

    // it('rendered star rating component', () => {
    //     expect(wrapper.find('.MuiRating-root').length).toEqual(1)
    // });
    
    // it('rendered address component', () => {
    //     expect(wrapper.find('[data-test="table-address"]').length).toEqual(1)
    // });

    // it('rendered country component', () => {
    //     expect(wrapper.find('[data-test="table-country"]').length).toEqual(1)
    // });
})
