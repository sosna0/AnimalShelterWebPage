import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/common/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Animals from './pages/Animals';
import AnimalDetails from './pages/AnimalDetails';
import AnimalNew from './pages/AnimalNew';
import AnimalEdit from './pages/AnimalEdit';
import Donations from './pages/Donations';
import DonationPayment from './pages/DonationPayment';
import DonationPaymentProcessing from './pages/DonationPaymentProcessing';
import ProfileNavigationCard from './components/common/ProfileNavigationCard';
import UserDonations from './pages/UserDonations';
import UserProfile from './pages/UserProfile';
import UserAdoptions from './pages/UserAdoptions';
import AdoptionNew from './pages/AdoptionNew';
import ManageAdoptions from './pages/ManageAdoptions';
import { ProtectedRoute } from './components/access/ProtectedRoute';
import { AuthProvider } from './hooks/use-auth';

function App() {
	return (
		<AuthProvider>
			<Router>
				<Layout>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/register" element={<Register />} />
						<Route path="/login" element={<Login />} />
						<Route path="/animals" element={<Animals />} />
						<Route path="/animals/:id" element={<AnimalDetails />} />
						<Route 
							path="/animals/new" 
							element={
								<ProtectedRoute allowedRoles={['staff']}>
									<AnimalNew />
								</ProtectedRoute>
							}
						/>
						<Route 
							path="/animals/edit/:id" 
							element={
								<ProtectedRoute allowedRoles={['staff']}>
									<AnimalEdit />
								</ProtectedRoute>
							}
						/>
						<Route path="/donate" element={<Donations />} />
						<Route path="/donate/payment" element={<DonationPayment />} />
						<Route path="/donate/payment/processing" element={<DonationPaymentProcessing />} />
						<Route path="/adoption/:id" element={<AdoptionNew />} />
						
						<Route path="/" element={<ProfileNavigationCard />}>
							<Route 
								path="/user-profile" 
								element={
									<ProtectedRoute allowedRoles={['public', 'staff']}>
										<UserProfile />
									</ProtectedRoute>
								}
							/>
							<Route 
								path="/user-adoptions" 
								element={
									<ProtectedRoute allowedRoles={['public']}>
										<UserAdoptions />
									</ProtectedRoute>
								}
							/>
							<Route 
								path="/user-donations" 
								element={
									<ProtectedRoute allowedRoles={['public']}>
										<UserDonations />
									</ProtectedRoute>
								}
							/>
							<Route 
								path="/manage-adoptions" 
								element={
									<ProtectedRoute allowedRoles={['staff']}>
										<ManageAdoptions />
									</ProtectedRoute>
								}
							/>
						</Route>
					</Routes>
				</Layout>
			</Router>
		</AuthProvider>
	);
}

export default App;
