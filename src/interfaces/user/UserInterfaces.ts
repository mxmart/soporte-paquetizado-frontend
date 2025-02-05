export interface IUser {
    id:                 number;
    company_name:       string;
    account_holder:     string;
    email:              string;
    cellphone:          string;
    profile_picture:    string;
    cognito_sub:        string;
    creation_date:      Date;
    position_id:        number;
    role_id:            number;
    company_id:         number;
    permissions:        string[];
    dashboard:          'Administrativo' | 'Cliente';
};

export interface IUserStats {
    attended_clients?: number;
    attended_hours?:    number;
    open_tickets:   number;
    attended_tickets:  number;
    notifications:     number;
};

export interface IPosition {
    id:          number;
    description: string;
};
export interface IEmail {
    email: string
};

export interface IRol {
    id:          number;
    description: string;
    label:       string;
};

