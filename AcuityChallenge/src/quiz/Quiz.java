package quiz;

import java.util.ArrayList;
import java.util.List;

import question.Question;

public class Quiz {
  
  private String name;
  private List<Question> questionList = new ArrayList<Question>();
  
  public Quiz(String name, List<Question> questionList) {
    this.name = name;
    this.questionList = questionList;
   
  }
  
  
  /**
   * @return the name
   */
  public String getName() {
    return name;
  }


  /**
   * @param name the name to set
   */
  public void setName(String name) {
    this.name = name;
  }


  private List<Question> getQuestionList() {
    return this.questionList;
  }
  
  public void addQuestion(Question question) {
    this.getQuestionList().add(question);
  }
  
  public boolean removeQuestion(Question question) {
    return this.getQuestionList().remove(question);
  }
}
