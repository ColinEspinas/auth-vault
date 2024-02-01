import { users } from '~/server/schema/users.sql'

const db = useDatabase()
const prepared = db.select({
  id: users.id,
  firstName: users.firstName,
  lastName: users.lastName,
  email: users.email,
}).from(users).orderBy(users.id).prepare('all-users')

export default defineEventHandler(async () => {
  return await prepared.execute()
})
