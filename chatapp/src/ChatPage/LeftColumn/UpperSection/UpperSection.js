import my_pic from '../../../../public/profile_pics/my_pic.png'

function UpperSection({ auth }) {

    return (
        <div className="d-flex flex-column">
            <div className='row px-1 mt-2'>
                <img src={my_pic} className="rounded-circle ml-3 col-4 profile" alt="Your Image" height="70px"></img>
                <h5 className='username col-7 my-4 align-center'>{auth.username}</h5>
            </div>
            
        </div>
    );
}

export default UpperSection;