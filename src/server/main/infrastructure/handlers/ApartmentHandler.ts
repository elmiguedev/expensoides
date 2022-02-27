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

    public add(req: Request, res: Response) {
        const apartment = this.addApartmentAction.execute({
            owner: req.body.owner,
            floor: req.body.floor,
            number: req.body.number
        });
        res.json(apartment);
    }

    public getAll(req: Request, res: Response) {
        res.json(this.listApartmentsAction.execute());
    }
}