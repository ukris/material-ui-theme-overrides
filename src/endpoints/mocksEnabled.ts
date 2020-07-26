const mocksEnabled = () => process.env.NODE_ENV !== 'production' && process.env.REACT_APP_NOMOCKS !== 'true'

export default mocksEnabled