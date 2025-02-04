export interface IUser {
    id:            number;
    company_name:  string;
    name:          string;
    email:         string;
    cellphone:     string;
    profile_pic:   string;
    cognito_sub:   string;
    creation_date: Date;
    position_id:   number;
    role_id:       number;
    company_id:    number;
    permissions:   string[];
    dashboard:     'Administrativo' | 'Cliente';
};

export interface IUserStats {
    attended_clients?: number;
    attended_hours?:    number;
    open_tickets:   number;
    attended_tickets:  number;
    notifications:     number;
};

