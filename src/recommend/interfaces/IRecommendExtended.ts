// eslint-disable-next-line @typescript-eslint/no-empty-interface
import {IDoctor} from "../../doctor/interfaces/IDoctor";
import {IPatient} from "../../patient/interfaces/IPatient";

export interface IRecommendExtended {
  ownerId?: IDoctor['id'];
  patientId?: IPatient['id'];
}
