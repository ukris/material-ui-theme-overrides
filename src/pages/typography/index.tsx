import React from 'react'
import { Grid, Typography as MuiTypography, Paper } from '@material-ui/core'
import { PageTitle } from 'components'
import useStyles from './styles'
enum Variant  {
  h1 = 'h1',
  h2 = 'h2',
  h3 = 'h3',
  h4 = 'h4',
  h5 = 'h5',
  h6 = 'h6',
  subtitle1 = 'subtitle1',
  subtitle2 = 'subtitle2',
  body1 = 'body1',
  body2 = 'body2',
  button = 'button',
  caption = 'caption',
  overline = 'overline',
  inherit = 'inherit',
}
const variants = {
  [Variant.h1]: 'h1. Heading',
  [Variant.h2]: 'h2. Heading',
  [Variant.h3]: 'h3. Heading',
  [Variant.h4]: 'h4. Heading',
  [Variant.h5]: 'h5. Heading',
  [Variant.h6]: 'h6. Heading',
  [Variant.subtitle1]:
    'subtitle1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur',
  [Variant.subtitle2]:
    'subtitle2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur',
  [Variant.body1]:
    'body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.',
  [Variant.body2]:
    'body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.',
  [Variant.button]: 'BUTTON TEXT',
  [Variant.caption]: 'caption text',
  [Variant.overline]: 'OVERLINE TEXT',
  [Variant.inherit]: 'Inherit'
}

const Typography = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <PageTitle title="Typography" />
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Grid item container spacing={2} xs={12}>
              {Object.keys(variants).map((key, index) => (
                <Grid key={index} item sm={9} xs={12}>
                  <MuiTypography variant={key as Variant}>{variants[key as Variant]}</MuiTypography>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}

export default Typography
