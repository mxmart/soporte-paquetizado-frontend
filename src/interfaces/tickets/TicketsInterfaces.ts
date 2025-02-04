export interface ICustomerTicket{
    type :string,
    title: string,
    ticket_status:string,  
    created_by:string, 
    creation_date:string
  }
export interface IAdminTicket{
    type :string,
    title: string,
    ticket_status:string,  
    client:string, 
    creation_date:string
  }