package question;

public abstract class Question {
  
  private String question;
  protected Question(String question) {
    this.question = question;
  }
  
  public boolean checkAnswer() {
    return false;
  }
  
  public String getQuestion() {
    return this.question;
  }
}
