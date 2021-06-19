// eslint-disable-next-line @typescript-eslint/no-empty-interface
import {IPatient} from "../../patient/interfaces/IPatient";

export interface IRecordsExtended {
  ownerId?: IPatient['id'];
  owner?: IPatient;
}
