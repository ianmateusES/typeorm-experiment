import dataSource from 'database';
import { Relation, User } from 'entities';
import { Request, Response } from 'express';
import { calculateMeta, calculateTakeSkip } from 'utils/pagination';

class RelationControllers {
  public async show(req: Request, res: Response): Promise<Response> {
    const { page, size } = req.query;

    const { skip, take } = calculateTakeSkip(
      Number(page) || 1,
      Number(size) || 2,
    );
    const ormRepository = dataSource.getRepository(Relation);
    const [relations, count] = await ormRepository.findAndCount({
      relations: ['requester_user', 'requested_user'],
      skip,
      take,
    });

    return res.json({
      data: relations,
      meta: calculateMeta(take, skip, count),
    });
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const { relation_id } = req.params;

    const ormRepository = dataSource.getRepository(Relation);

    const relation = await ormRepository.findOne({
      where: {
        id: relation_id,
      },
    });
    if (!relation) {
      return res
        .status(400)
        .json({ status: 'error', message: 'relation does not exist!' });
    }

    const [requester_user, requested_user] = await Promise.all([
      dataSource
        .getRepository(User)
        .findOneBy({ id: relation.requester_user_id }),
      dataSource
        .getRepository(User)
        .findOneBy({ id: relation.requested_user_id }),
    ]);

    Object.assign(relation, { requester_user, requested_user });

    return res.json(relation);
  }
}

export { RelationControllers };
