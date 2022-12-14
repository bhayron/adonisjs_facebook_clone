import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { User } from 'App/Models'
import { StoreValidator } from 'App/Validators/User/Register'
import faker from 'faker'

export default class UserRegistrersController {
  public async store({ request }: HttpContextContract) {
    const { email, redirectUrl } = await request.validate(StoreValidator)
    const user = await User.create({ email })
    await user.save()
    const key = faker.datatype.uuid() + user.id
    user.related('keys').create({ key })
    const link = `${redirectUrl.replace(/\/$/, '')}/${key}`
  }

  public async show({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}
}
