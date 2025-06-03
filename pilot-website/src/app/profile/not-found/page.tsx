import React from 'react'
import { Button } from '~/components/ui/button'

export default function page() {
  return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 pt-20">
        <div className="text-center">
          <h2 className="mb-2 text-2xl font-bold">User not found</h2>
          <p className="mb-6 text-gray-600">
            The profile you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <a href="/">Return to Home</a>
          </Button>
        </div>
      </div>

  )
}
