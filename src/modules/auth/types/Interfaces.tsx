interface IRoles {
    id: number;
    name: string;
    guard_name: string;
    pivot: {
        role_id: number;
        permission_id: number;
    }
                       
    }
    
export interface IUserData {
 id?: number;
 first_name?: string;
 email?: string;
 admin?: number;
 latest_offers?: number;
 subscribed_to_notifications?: number;
 roles?: IRoles[];
}
    
export interface IAuthContextValues {
    userToken?: string | null;
    setUserToken?: (userToken: string | null) => void;
    // setUserToken?: React.Dispatch<React.SetStateAction<string | null>>;
    userData?: IUserData;  
    setUserData?: React.Dispatch<React.SetStateAction<IUserData>>;
    // setUserData?: React.Dispatch<React.SetStateAction<IUserData>>;
    setCurrentUserType?: (currentUserType: string | null) => void;
    // setCurrentUserType?: React.Dispatch<React.SetStateAction<string | null>>
    handleUnAuthenticated?: (route : string) => void
    currentUserType?: string | null;
}


