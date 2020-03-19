import React, {Component} from 'react';


class Login extends Component {

	render() {
		return (
			<div className='content-wrapper'>
				<div className='container'>
					<div className="row pad-botm">
						<div className="col-md-12">
							<h1 className="header-line">Login Here</h1>
						</div>
					</div>

					<div className='row'>
						<div className='col-md-6 col-sm-6 col-xs-12 col-md-offset-3'>
							<div className='panel panel-info'>
								<div className='panel-heading'>
									Login
								</div>
								<div className="panel-body">
									<div className="form-group">
										<label>Email : </label>
										<input className="form-control" type="text" />
									</div>
									<div className="form-group">
										<label>Password : </label>
										<input className="form-control" type="text" />
									</div>
									<div className="form-group">
										<button className="btn btn-success">Login</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Login;