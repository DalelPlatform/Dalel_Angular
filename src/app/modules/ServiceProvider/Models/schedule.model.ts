export interface scheduleItem
{
    WorKDay: WorkDays,
    AvailableFrom: string,
    AvailableTo:string
}
export enum WorkDays
{
        Sunday,
        Monday,
        Tuesday,
        Wandesday,
        Thurseday,
        Friday,
        Satrday,
}
export interface Schedule
{
    ServiceProviderId: string,
    Schedules: scheduleItem
}