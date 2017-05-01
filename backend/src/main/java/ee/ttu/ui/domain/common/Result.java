package ee.ttu.ui.domain.common;

/**
 * Created by Hans on 11.02.2017.
 */
public class Result<T> {

    private boolean ok;
    private T data;

    private Result(boolean ok, T data) {
        this.ok = ok;
        this.data = data;
    }

    public static <I> Result<I> ok() {
        return new Result<>(true, null);
    }

    public static <I> Result<I> ok(I data) {
        return new Result<>(true, data);
    }

    public static <I> Result<I> nok(I data) {
        return new Result<>(false, data);
    }

    public boolean isOk() {
        return ok;
    }

    public T getData() {
        return data;
    }
}
