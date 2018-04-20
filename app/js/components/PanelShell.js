import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import StyledPanel from '@styled/onboarding'
import Show from '@components/Show'
import { SyncIcon } from 'mdi-react'
import { Spring, animated } from 'react-spring'
import Spinner from '@components/styled/Spinner'

import * as Icons from 'mdi-react'

const renderItems = (items, view) =>
  items.map(({ show, props, Component }, i) => (
    <Show key={i} when={view === show}>
      <Component {...props} showing={view === show} />
    </Show>
  ))

const PanelShell = ({ children, ...rest }) => (
  <StyledPanel {...rest} bg="grey.2">
    {children}
  </StyledPanel>
)

const PanelCardHeader = ({
  title = 'Create your Blockstack ID',
  icon = 'https://file-byvymyglhi.now.sh/',
  appIcon,
  variant,
  p = 3,
  pt = 5,
  pb = 3,
  mdi,
  h2,
  h5,
  ...rest
}) => {
  const AppIcon = appIcon && (
    <StyledPanel.Card.IconWrapper appConnect>
      {variant !== 'small' && <img src={icon} />}
      {variant !== 'small' && <SyncIcon />}
      {appIcon && <img src={appIcon} />}
    </StyledPanel.Card.IconWrapper>
  )

  const renderTitle = () => {
    if (!h2 && title) {
      return (
        <StyledPanel.Card.Title pt={2}>
          <h3>{title}</h3>
        </StyledPanel.Card.Title>
      )
    }
    if (h2) {
      let Icon = null
      if (mdi && Icons[mdi]) {
        Icon = Icons[mdi]
      }
      return (
        <StyledPanel.Card.Title pt={2} full>
          <StyledPanel.Card.Title.Wrapper>
            {Icon && <Icon size={'1.75rem'} color="#2c96ff" />}
            <h2>{h2}</h2>
          </StyledPanel.Card.Title.Wrapper>
          {h5 && <h5>{h5}</h5>}
        </StyledPanel.Card.Title>
      )
    }
  }
  return (
    <StyledPanel.Card.Header {...rest} p={p} pt={pt} pb={pb} variant={variant}>
      {icon && (
        <StyledPanel.Card.IconWrapper>
          {appIcon && AppIcon}
          {!appIcon && !mdi && <img src={icon} />}
        </StyledPanel.Card.IconWrapper>
      )}
      {renderTitle()}
    </StyledPanel.Card.Header>
  )
}

const PanelCard = ({
  variant = 'default',
  renderHeader = () => {},
  children,
  ...rest
}) => {
  return (
    <StyledPanel.Card {...rest} variant={variant}>
      {renderHeader()}
      <StyledPanel.Card.Content p={4}>{children}</StyledPanel.Card.Content>
    </StyledPanel.Card>
  )
}

PanelCard.InputOverlay = ({
  text,
  children,
  icon: { component: Icon, show },
  ...rest
}) => (
  <StyledPanel.Card.Section
    inputIcon={show}
    style={{
      position: 'relative'
    }}
  >
    {Icon && (
      <StyledPanel.Card.InputIcon show={show}>
        <Icon color="green" />
      </StyledPanel.Card.InputIcon>
    )}
    {children}
    <StyledPanel.Card.InputOverlay>{text}</StyledPanel.Card.InputOverlay>
  </StyledPanel.Card.Section>
)

PanelCard.Error = ({ icon, message }) => (
  <StyledPanel.Card.ErrorMessage>
    <StyledPanel.Card.ErrorMessage.Icon>
      {icon}
    </StyledPanel.Card.ErrorMessage.Icon>
    <p>{message}</p>
  </StyledPanel.Card.ErrorMessage>
)

PanelCard.Section = StyledPanel.Card.Section
PanelCard.Loading = ({ show, message }) =>
  show && (
    <Spring
      from={{
        opacity: 0
      }}
      to={{
        opacity: 1
      }}
    >
      {styles => (
        <StyledPanel.Loading style={styles}>
          <Spinner />
          {message && (
            <Spring
              native
              from={{
                top: 20
              }}
              to={{
                top: 0
              }}
            >
              {textStyles => (
                <animated.h5
                  style={{
                    paddingTop: '20px',
                    ...textStyles
                  }}
                >
                  {message}
                </animated.h5>
              )}
            </Spring>
          )}
        </StyledPanel.Loading>
      )}
    </Spring>
  )

PanelShell.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.node,
  icon: PropTypes.node
}

PanelCardHeader.propTypes = {
  title: PropTypes.node,
  icon: PropTypes.node
}

PanelCard.propTypes = {
  children: PropTypes.node.isRequired,
  header: PropTypes.func
}

export default PanelShell

export { PanelCard, PanelCardHeader, renderItems }