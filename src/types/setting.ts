export interface Setting {
  setting: string;
  value: any;
}

export interface SettingsArgs {
  id: string;
  setting: Setting;
}
