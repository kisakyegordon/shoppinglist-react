import superagent from 'superagent';

export function registerRequest(userData) {
    return dispatch => {
        return(
            superagent
                .post('http://127.0.0.1:5000/auth/register')
                .send(userData)
                .end((err, res) => {
                    if(err){
                        this.setState({ errorMessage : 'Authentication Failed'}); return;
                    }
                    console.log('res.body:', res.body)
                })
        );
    }
}