import { Abilities } from './Abilities'

export abstract class PageMap {
    public static pages = [
            { url: "change-password", abilitiesIds: [Abilities.Change_Password] },
            { url: "user-checkins", abilitiesIds: [Abilities.Get_User_ChechIns] },
            { url: "checkins", abilitiesIds: [Abilities.Get_Current_User_CheckIns] },
            { url: "users", abilitiesIds: [Abilities.Get_All_Other_Users] },
            { url: "holidays", abilitiesIds: [Abilities.Get_Holidays] },
            { url: "vacations", abilitiesIds: [Abilities.Get_Current_User_Vacations] },
            { url: "user-vacations", abilitiesIds: [Abilities.Get_User_Vacations] },
            { url: "calculations", abilitiesIds: [Abilities.Current_User_CheckIns_Calculations] },
            { url: "user-calculations", abilitiesIds: [Abilities.User_CheckIns_Calculations] },
            { url: "roles", abilitiesIds: [Abilities.Get_Roles] },
        ]
}