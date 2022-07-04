export class User {
  id?: string;
  displayName?: string;
  image?: string;
  role?: string;

  constructor(
    id: string,
    displayName: string,
    image: string,
    role: string
  ) {
    this.id = id;
    this.displayName = displayName;
    this.image = image;
    this.role = role;
  }

}

export class UserAuth {
  DisplayName?: string;
  Token?: string;
  UserId?: string;

  constructor(
    DisplayName: string,
    Token: string,
    UserId: string
    
  ) {
    this.DisplayName = DisplayName;
    this.Token = Token;
    this.UserId = UserId; 
  }
}


export class UserApiModel {
  DisplayName?: string;
  Role?: string;
  Active: boolean;
  Email?: string;
  ExternalId?: string;
  FirstName?: string;
  LastName?: string;
  UserName?: string;
  Password?: string;
  Image?: string;
  Id: string;

  constructor(
    DisplayName: string,
    Role: string,
    Active: boolean,
    Email: string,
    ExternalId: string,
    FirstName: string,
    LastName: string,
    UserName: string,
    Password: string,
    Image: string,
    Id: string,
  ) {
    this.DisplayName = DisplayName;
    this.Role = Role;
    this.Active = Active;
    this.Email = Email;
    this.ExternalId = ExternalId;
    this.FirstName = FirstName;
    this.LastName = LastName;
    this.UserName = UserName;
    this.Password = Password;
    this.Image = Image;
    this.Id = Id;
  }
}


