import React, { ReactNode, useState, useEffect } from 'react'
import clsx from 'clsx'

import Person from '@material-ui/icons/Person'
import { OverridableComponent } from '@material-ui/core/OverridableComponent'
import { SvgIconTypeMap } from '@material-ui/core/SvgIcon'
import { WithStyles, withStyles, Theme} from '@material-ui/core/styles'

import { hashNumber, getInitials } from 'helpers/misc'
import GlobalContext from 'context/global-context'
import { Size} from 'types'

import { LIGHT, WHITE, BLACK, getHashColor } from 'theme/palette'
import { IAvatar, Shape } from './types'

// @ts-ignore
export function valToAvatars(values:any[], col?:any):IAvatar[]  {
  return (values||[]).map(val=>{
    return{
      src:val[0],
      name: val[1]
    }
  })
}

const styles = (theme: Theme):any => {
    const { fontSize, palette, shape, zoomSpacing,typography } = theme
    const color =  palette.type === 'light' ? palette.grey[400] : palette.grey['A700']
    const def = palette.background.default
    const spacing2 = zoomSpacing(2)
    const spacing3 = zoomSpacing(3)
    const spacing4 = zoomSpacing(4)
    const spacing5 = zoomSpacing(5)
    const spacing6 = zoomSpacing(6)

    return {
        root: {
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            fontFamily: typography.fontFamily,
            lineHeight: 1,
            overflow: 'hidden',
            userSelect: 'none',
        },
        /* Styles applied to the root element if not `src` or `srcSet`. */
        colorDefault: {
            color: def,
            backgroundColor: color
        },
        /* Styles applied to the root element if `variant="circle"`. */
        circle: {
          borderRadius: '50%',
        },
        border: {
          border: `2px solid ${def}`
        },
        noClass: {
          
        },
        /* Styles applied to the root element if `variant="rounded"`. */
        round: {
            borderRadius: shape.borderRadius,
        },
        /* Styles applied to the root element if `variant="square"`. */
        square: {
            borderRadius: 0,
        },
        /* Styles applied to the img element if either `src` or `srcSet` is defined. */
        img: {
            width: '100%',
            height: '100%',
            // Handle non-square image. The property isn't supported by IE 11.
            objectFit: 'contain',
            // Hide alt text.
            color: 'transparent',
        },
        xs: {
            width: spacing2,
            height: spacing2,
            fontSize: fontSize.xs
        },
        sm: {
            width: spacing3,
            height: spacing3,
            fontSize: fontSize.sm
        },
        md: {
            width: spacing4,
            height: spacing4,
            fontSize: fontSize.md
        },
        lg: {
            width:  spacing5,
            height: spacing5,
            fontSize: fontSize.lg
        },
        xl: {
            width: spacing6,
            height: spacing6,
            fontSize: fontSize.xl
        }
    }
}

export interface StyleProps  extends WithStyles<typeof styles> {
   
}

export interface AvatarProps extends StyleProps, IAvatar{
    imgProps?: React.ImgHTMLAttributes<HTMLImageElement>
    size?: Size
    shape?: Shape
    border?: boolean
    className?: string
    style?: object
    children?: ReactNode
    component?: any
    custom?: boolean
    extra?: boolean
    initials?: number
    cStyle?: object
    Icon?:  OverridableComponent<SvgIconTypeMap<{}, "svg">> | null
}

const Avatar = function Avatar(props: AvatarProps) {
    
    const {
      name,
      children: childrenProp,
      classes,
      className,
      component: Component = 'div',
      imgProps,
      src,
      custom,
      size='md',
      shape = 'circle',
      border = true,
      style={},
      extra,
      cStyle={},
      Icon,
      handleClick,
      initials=2,
      ...other
    } = props
  
    if (handleClick) {
      // @ts-ignore
      style.cursor = 'pointer'
    }
    const { palette } = GlobalContext.theme
    const [loadedSrc, setLoadedSrc] = useState<boolean>(false)

    let children = null;
    const borderCls = border ? 'border' : 'noClass'

    useEffect(()=> {
      if (src) {
        const image = new Image()
        image.src = src
        image.onload = () => {
          setLoadedSrc(true)
        }
        image.onerror = () => {
        }
      }
    },[src, setLoadedSrc ])

    if (loadedSrc) {
      children = (
        <img
          alt={name}
          src={src} 
          className={classes.img}
          {...imgProps}
        />
      )
    } else if (childrenProp != null) {
      children = childrenProp;
    } else if (name) {
      if (!extra) {
        const number = hashNumber(name)
        const color = getHashColor(number)
        children = getInitials(name,initials)
        // @ts-ignore
        style.backgroundColor = color
          // @ts-ignore
        if (!palette) {
          debugger
        }
        style.color = palette.type === LIGHT ? WHITE : BLACK
      } else {
        children = name
      }
    } else {
      children = Icon? <Icon className={classes.fallback} />: <Person className={classes.fallback} />;
    }
    const cls = custom ? '' : clsx(
      classes.root,
      classes.system,
      classes[borderCls],
      classes[shape],
      classes[size],
      {
        [classes.colorDefault]: !!!src,
      },
      className,
    )
    const child = loadedSrc ? children : (
      <div 
        className="inline-flex  justify-center items-center"  style={cStyle}>
        {children}
      </div>)
    return (
      <Component
        data-test="table-avatar"
        className={cls}
        style={style}
        {...other}
        onClick={(e:any)=>handleClick&&handleClick(e)}
      >
       {child}
      </Component>
    );
}
export default withStyles(styles)(Avatar)