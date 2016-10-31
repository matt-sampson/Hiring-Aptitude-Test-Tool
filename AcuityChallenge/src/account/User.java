package account;

public abstract class User {
  
  private String userName;
  private String password;
  
  protected User(String userName, String password) {
    this.userName = userName;
    this.password = password;
  }
  
  void login(String userName, String password) {
    
  }
}
