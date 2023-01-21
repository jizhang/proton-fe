import React, { Suspense } from 'react'
import { RouterProvider } from 'react-router-dom'
import router from './router'

export default () => {
  return (
    <Suspense fallback="Loading...">
      <RouterProvider router={router} />
    </Suspense>
  )
}
