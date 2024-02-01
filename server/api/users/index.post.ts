import { insertUserSchema, users } from '~/server/schema/users.sql'
import { usePassword } from '~/server/utils/password'

const db = useDatabase()

export default defineEventHandler(async (event) => {
  const user = await readValidatedBody(event, data => insertUserSchema.parse(data))
  const encryptedPassword = await usePassword().hash(user.password)

  try {
    await db.insert(users).values({ ...user, password: encryptedPassword })
  }
  catch (error: any) {
    return createError({ message: error.message, status: error.status })
  }

  event.node.res.end()
})
