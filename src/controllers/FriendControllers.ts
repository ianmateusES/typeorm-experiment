import dataSource from 'database';
import { Friend } from 'entities';
import { Request, Response } from 'express';

class FriendControllers {
  public async store(req: Request, res: Response): Promise<Response> {
    const { requester_user_id, requested_user_id, status } = req.body;

    const ormRepository = dataSource.getRepository(Friend);
    let friend = await ormRepository.findOneBy([
      { requester_user_id, requested_user_id },
      {
        requester_user_id: requested_user_id,
        requested_user_id: requester_user_id,
      },
    ]);
    if (friend) {
      return res
        .status(400)
        .json({ status: 'error', message: 'Friend already exist!' });
    }

    friend = ormRepository.create({
      requester_user_id,
      requested_user_id,
      status,
    });

    await ormRepository.save(friend);

    return res.status(201).json(friend);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const ormRepository = dataSource.getRepository(Friend);
    const friends = await ormRepository.find({
      relations: ['requester_user', 'requested_user'],
    });

    return res.json({ friends });
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const { friend_id } = req.params;

    const ormRepository = dataSource.getRepository(Friend);
    const friend = await ormRepository.findOne({
      where: {
        id: friend_id,
      },
      relations: ['requester_user', 'requested_user'],
    });
    if (!friend) {
      return res
        .status(400)
        .json({ status: 'error', message: 'Friend does not exist!' });
    }

    return res.json(friend);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { friend_id } = req.params;
    const { status } = req.body;

    const ormRepository = dataSource.getRepository(Friend);

    let friend = await ormRepository.findOne({
      where: {
        id: friend_id,
      },
    });
    if (!friend) {
      return res
        .status(400)
        .json({ status: 'error', message: 'Friend does not exist!' });
    }

    Object.assign(friend, { status });
    friend = await ormRepository.save(friend);

    return res.json(friend);
  }

  public async destroy(req: Request, res: Response): Promise<Response> {
    const { friend_id } = req.params;

    const ormRepository = dataSource.getRepository(Friend);
    await ormRepository.delete(friend_id);

    return res.status(202).send();
  }
}

export { FriendControllers };
