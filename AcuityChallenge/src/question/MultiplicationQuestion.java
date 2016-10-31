package question;

public class MultiplicationQuestion extends Question{

  protected MultiplicationQuestion(String question) {
    super(question);
    
  }
  
  public int getAnswer(int x, int y) {
    return x*y;
  }
  
}
