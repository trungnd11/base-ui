import { AppOptionType } from "@models/componentModels/AppSelectModel";

export interface TypeConfig {
  applicationName: any[]
  [key: string]: any
};

export interface TypeConfigData {
  config: TypeConfig
};

export interface TypeConfigShare {
  acsTransactionStatus: AppOptionType[]
  acsTransactionGroup: AppOptionType[]
  acsTransactionSwichCode: AppOptionType[]
  acsTransactionRelation: AppOptionType[]
  acsTransactionType: AppOptionType[]
  acsMerchant: AppOptionType[]
  acsBankList: AppOptionType[]
  acsCompareResult?: AppOptionType[]
  acsRcMoneySource?: AppOptionType[]
  acsProcessStatus?: AppOptionType[]
}
