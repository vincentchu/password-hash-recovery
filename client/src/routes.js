// @flow
import React from 'react'
import App from './views/App'
import NotFound from './views/NotFound'

export const ROUTE_TRANSITION = 'routes/ROUTE_TRANSITION'

const Home = () => (
  <h1>This is home</h1>
)

const makeRoute = (
  path: string,
  component: typeof React.Component | Function
) => ({
  path,
  component,
})

const HomeRoute = makeRoute('/', Home, true)
const NotFoundRoute = makeRoute('*', NotFound, true)

export default {
  component: App,
  childRoutes: [
    HomeRoute,
    NotFoundRoute,
  ],
}
