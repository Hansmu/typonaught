package ee.ttu.ui.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="high_score")
public class HighScore {

    @Id
    @GeneratedValue
    private Long id;
    private String playerIdentifier;
    private Integer victories;
    private String username;

    public HighScore() {
    }

    public HighScore(String playerIdentifier, String username) {
        this.playerIdentifier = playerIdentifier;
        this.username = username;
        this.victories = 0;
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

    public Integer getVictories() {
        return victories;
    }

    public void setVictories(Integer victories) {
        this.victories = victories;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
