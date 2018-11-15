import CircularProgress from '@material-ui/core/CircularProgress'
export const progressBarShow = (loading) => {
    if (loading) {
        return <CircularProgress className="my-progress-cicle" thickness={5} size={24} />
    }
    else {
        return 'Submit'
    }
}