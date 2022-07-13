import dataSource from 'database';
import { Interest } from 'entities';
import { Request, Response } from 'express';

class InterestControllers {
  public async store(req: Request, res: Response): Promise<Response> {
    const { name } = req.body;

    const repository = dataSource.getRepository(Interest);

    let interest = await repository.findOneBy({ name });
    if (interest) {
      return res
        .status(400)
        .json({ status: 'error', message: 'Name already exist!' });
    }

    interest = repository.create({ name });
    await repository.save(interest);

    return res.status(201).json(interest);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const repository = dataSource.getRepository(Interest);

    const interests = await repository.find({ order: { id: 'ASC' } });

    return res.status(200).json({ data: interests });
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { interest_id } = req.params;
    const { name } = req.body;

    const repository = dataSource.getRepository(Interest);

    let interest = await repository.findOneBy({ id: Number(interest_id) });
    if (!interest) {
      return res
        .status(400)
        .json({ status: 'error', message: 'Interest does not exist!' });
    }

    if (name !== interest.name) {
      const interestName = await repository.findOneBy({ name });
      if (interestName) {
        return res
          .status(400)
          .json({ status: 'error', message: 'Name already exist!' });
      }
    }

    Object.assign(interest, { name });
    interest = await repository.save(interest);

    return res.status(200).json(interest);
  }
}

export { InterestControllers };
