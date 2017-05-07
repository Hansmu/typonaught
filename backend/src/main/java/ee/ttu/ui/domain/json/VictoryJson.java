package ee.ttu.ui.domain.json;

import ee.ttu.ui.domain.GameMatch;

import java.util.List;

public class VictoryJson {

    private boolean iaWinner;
    private List<GameMatch> rounds;

    public VictoryJson() {
    }

    public VictoryJson(boolean iaWinner, List<GameMatch> rounds) {
        this.iaWinner = iaWinner;
        this.rounds = rounds;
    }

    public boolean isIaWinner() {
        return iaWinner;
    }

    public void setIaWinner(boolean iaWinner) {
        this.iaWinner = iaWinner;
    }

    public List<GameMatch> getRounds() {
        return rounds;
    }

    public void setRounds(List<GameMatch> rounds) {
        this.rounds = rounds;
    }
}
