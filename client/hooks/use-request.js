import axios from 'axios';
import {useState} from 'react';

export default ({ url, method, body, onSuccess }) => {
    const [errors, setErrors] = useState(null);
    const doRequest = async () => {
        try {
            setErrors(null);
            console.log("use-request", body);
            const response = await axios[method](url, body);
            if (onSuccess) {
                console.log('doRequest: ', response.data);
                onSuccess(response.data);
            }

            return response;
        } catch(err) {
            setErrors(
            <div className="alert alert-danger">
                <h4>Oooops...error</h4>
                <ul className="my-0"></ul>
                {err.response.data.errors.map(err => <li key={err.message}>{err.message}</li>)}
            </div>);
        }
    }
    return { doRequest, errors };
}