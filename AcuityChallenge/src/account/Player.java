package account;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import question.Question;
import quiz.Quiz;

public class Player extends User {
  
  private Map<String, Quiz> quizList = new HashMap<String, Quiz>();
  private Set<Question> questionBank = new HashSet<Question>();
  
  public Player(String userName, String password, Map<String, Quiz> quizList,
      Set<Question> questionBank) {
    super(userName, password);
    this.quizList = quizList;
    this.questionBank = questionBank;
  }
  
  /**
   * @return the quizList
   */
  public Collection<Quiz> getQuizList() {
    return this.quizList.values();
  }
  
  /**
   * @param quizList
   *          the quizList to set
   */
  public void setQuizList(Map<String, Quiz> quizList) {
    this.quizList = quizList;
  }
  
  /**
   * @return the questionBank
   */
  public Set<Question> getQuestionBank() {
    return questionBank;
  }
  
  /**
   * @param questionBank
   *          the questionBank to set
   */
  public void setQuestionBank(Set<Question> questionBank) {
    this.questionBank = questionBank;
  }
  
  public void addQuestion(Question question) {
    this.getQuestionBank().add(question);
  }
  
  public boolean removeQuestion(Question question) {
    return this.getQuestionBank().remove(question);
  }
  
  public void addQuestionToQuiz(String quizName, Question question) {
    
    Quiz quiz = this.quizList.get(quizName);
    if(quiz == null) {
      quiz = new Quiz(quizName, new ArrayList<Question>());
      quiz.addQuestion(question);
    }else {
      quiz.addQuestion(question);
    }
    
  }
  
  public boolean removeQuestionFromQuiz(String quizName, Question question) {
    Quiz quiz = this.quizList.get(quizName);
    if(quiz == null) {
      throw new IllegalArgumentException("Quiz name not exist.");
    }else {
      return quiz.removeQuestion(question);
    }
  }
  
  public void addQuiz(Quiz quiz) {
    this.quizList.put(quiz.getName(), quiz);
  }
  
  public boolean removeQuiz(Quiz quiz) {
    if(this.quizList.remove(quiz.getName()) == null) {
      return false;
    }else {
      return true;
    }
  }
}
