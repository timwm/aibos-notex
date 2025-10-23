import { redirect } from 'next/navigation'

import { createClient } from '~/utils/supabase/server'
import { LOGIN_URL } from '~/lib/constants'

export default async function PrivatePage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect(LOGIN_URL)
  }

  return <p>Hello {data.user.email}</p>
}
