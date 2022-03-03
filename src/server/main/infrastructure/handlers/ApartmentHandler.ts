import { Request, Response } from "express";
import { AddApartmentAction } from "../../actions/apartments/AddApartmentAction";
import { ListApartmentsAction } from "../../actions/apartments/ListApartmentsAction";

export class ApartmentHandler {
    private addApartmentAction: AddApartmentAction;
    private listApartmentsAction: ListApartmentsAction;

    constructor(
        addApartmentAction: AddApartmentAction,
        listApartmentsAction: ListApartmentsAction
    ) {
        this.addApartmentAction = addApartmentAction;
        this.listApartmentsAction = listApartmentsAction;
    }

    public async add(req: Request, res: Response) {
        const apartment = await this.addApartmentAction.execute({
            owner: req.body.owner,
            floor: req.body.floor,
            number: req.body.number
        });
        res.json(apartment);
    }

    public async getAll(req: Request, res: Response) {
        const apartments = await this.listApartmentsAction.execute();
        res.json(apartments);
    }
}