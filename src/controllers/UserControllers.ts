import { Request, Response } from 'express';
import { In } from 'typeorm';

import dataSource from '../database';
import { Interest, User } from '../entities';

class UserControllers {
  public async store(req: Request, res: Response): Promise<Response> {
    const { name, interests } = req.body;

    const ormRepository = dataSource.getRepository(User);
    let user = await ormRepository.findOneBy({ name });
    if (user) {
      return res
        .status(400)
        .json({ status: 'error', message: 'Name already exist!' });
    }

    user = ormRepository.create({ name, interests });
    await ormRepository.save(user);

    return res.status(201).json(user);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const ormRepository = dataSource.getRepository(User);

    let users = await ormRepository.find();

    users = await Promise.all(
      users.map(async user => {
        if (user.interests) {
          Object.assign(user, {
            interests: await dataSource
              .getRepository(Interest)
              .findBy({ id: In(user.interests) }),
          });
        }

        return user;
      }),
    );

    return res.json({ users });
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const { user_id } = req.params;

    const ormRepository = dataSource.getRepository(User);
    const user = await ormRepository.findOne({
      where: {
        id: user_id,
      },
    });
    if (!user) {
      return res
        .status(400)
        .json({ status: 'error', message: 'User does not exist!' });
    }

    return res.json(user);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { user_id } = req.params;
    const { name, interests } = req.body;

    const ormRepository = dataSource.getRepository(User);

    let user = await ormRepository.findOne({
      where: {
        id: user_id,
      },
    });
    if (!user) {
      return res
        .status(400)
        .json({ status: 'error', message: 'User does not exist!' });
    }

    if (name !== user.name) {
      const userName = await ormRepository.findOneBy({ name });
      if (userName) {
        return res
          .status(400)
          .json({ status: 'error', message: 'Name already exist!' });
      }
    }

    Object.assign(user, { name, interests });
    user = await ormRepository.save(user);

    return res.json(user);
  }

  public async destroy(req: Request, res: Response): Promise<Response> {
    const { user_id } = req.params;

    const ormRepository = dataSource.getRepository(User);
    await ormRepository.delete(user_id);

    return res.status(202).send();
  }
}

export { UserControllers };
