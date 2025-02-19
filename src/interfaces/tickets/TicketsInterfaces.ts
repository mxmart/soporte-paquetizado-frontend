export interface ICustomerTicket{
    type :string,
    title: string,
    ticket_status:string,  
    created_by:string, 
    creation_date:string
};
export interface IAdminTicket{
    type :string,
    title: string,
    ticket_status:string,  
    client:string, 
    creation_date:string
};

export interface IMessage {
  id: number;
  content: string;
  creation_date: Date;
  send_by: string;
  profile_pic: string;
  user_id: number;
  cognito_sub: string;
  content_type_id: number;
  type: string;
};