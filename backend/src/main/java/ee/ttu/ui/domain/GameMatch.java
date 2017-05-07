package ee.ttu.ui.domain;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="game_match")
public class GameMatch {

    @Id
    @GeneratedValue
    private Long id;
    private String playerIdentifier;
    private String roomIdentifier;
    private String word;
    private Boolean victory;
    private Integer timeSpent;

    public GameMatch() {
    }

    public GameMatch(String playerIdentifier, String roomIdentifier, String word, Boolean victory, Integer timeSpent) {
        this.playerIdentifier = playerIdentifier;
        this.roomIdentifier = roomIdentifier;
        this.word = word;
        this.victory = victory;
        this.timeSpent = timeSpent;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPlayerIdentifier() {
        return playerIdentifier;
    }

    public void setPlayerIdentifier(String playerIdentifier) {
        this.playerIdentifier = playerIdentifier;
    }

    public String getRoomIdentifier() {
        return roomIdentifier;
    }

    public void setRoomIdentifier(String roomIdentifier) {
        this.roomIdentifier = roomIdentifier;
    }

    public String getWord() {
        return word;
    }

    public void setWord(String word) {
        this.word = word;
    }

    public Boolean getVictory() {
        return victory;
    }

    public void setVictory(Boolean victory) {
        this.victory = victory;
    }

    public Integer getTimeSpent() {
        return timeSpent;
    }

    public void setTimeSpent(Integer timeSpent) {
        this.timeSpent = timeSpent;
    }
}
