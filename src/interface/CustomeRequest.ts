import { Request } from "express";
import { IUserModel } from "../models/User";

interface ICustomRequest extends Request {
    user?: IUserModel
}

export default ICustomRequest;