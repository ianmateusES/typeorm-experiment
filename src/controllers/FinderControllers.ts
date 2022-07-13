import dataSource from 'database';
import { Finder } from 'entities';
import { Request, Response } from 'express';

class FinderControllers {
  public async store(req: Request, res: Response): Promise<Response> {
    const { requester_user_id, requested_user_id, status } = req.body;

    const ormRepository = dataSource.getRepository(Finder);
    let finder = await ormRepository.findOneBy([
      { requester_user_id, requested_user_id },
      {
        requester_user_id: requested_user_id,
        requested_user_id: requester_user_id,
      },
    ]);
    if (finder) {
      return res
        .status(400)
        .json({ status: 'error', message: 'Finder already exist!' });
    }

    finder = ormRepository.create({
      requester_user_id,
      requested_user_id,
      status,
    });

    await ormRepository.save(finder);

    return res.status(201).json(finder);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const ormRepository = dataSource.getRepository(Finder);
    const finders = await ormRepository.find({
      relations: ['requester_user', 'requested_user'],
    });

    return res.json({ finders });
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const { finder_id } = req.params;

    const ormRepository = dataSource.getRepository(Finder);
    const finder = await ormRepository.findOne({
      where: {
        id: finder_id,
      },
      relations: ['requester_user', 'requested_user'],
    });
    if (!finder) {
      return res
        .status(400)
        .json({ status: 'error', message: 'Finder does not exist!' });
    }

    return res.json(finder);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { finder_id } = req.params;
    const { status } = req.body;

    const ormRepository = dataSource.getRepository(Finder);

    let finder = await ormRepository.findOne({
      where: {
        id: finder_id,
      },
    });
    if (!finder) {
      return res
        .status(400)
        .json({ status: 'error', message: 'Finder does not exist!' });
    }

    Object.assign(finder, { status });
    finder = await ormRepository.save(finder);

    return res.json(finder);
  }

  public async destroy(req: Request, res: Response): Promise<Response> {
    const { finder_id } = req.params;

    const ormRepository = dataSource.getRepository(Finder);
    await ormRepository.delete(finder_id);

    return res.status(202).send();
  }
}

export { FinderControllers };
