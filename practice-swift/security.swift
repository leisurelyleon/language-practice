import LocalAuthentication

enum AuthenticationError: Error {
    case biometricAuthenticationFailed
    case biometricNotAvailable
    case biometricNotEnrolled
}

class BiometricAuthenticationManager {

    func authenticationUser(completion: @escaping (Result<Void, AuthenticationError>) -> Void) {
        let context = LAContext()

        var error: NSError?

        // Check if biometric authentication is available
        if context.canEvaluatePolicy(.deviceOwnerAuthenticationWithBiometrics, error: &error) {
            let reason = "Authenticate to access secure content"

            // Perform biometric authentication
            context.evaluatePolicy(.deviceOwnerAuthenticationWithBiometrics, localizedReason: reason) {
                success, authenticationError in

                if success {
                    // Authentication successful
                    completion(.success(()))
                } else {
                    if let authError = authenticationError as? LAError {
                        switch authError.code {
                        case .authenticationFailed:
                            completion(.failure(.biometricAuthenticationFailed))
                        case .biometryNotAvailable:
                            completion(.failure(.biometricNotAvailable))
                        case .biometryNotEnrolled:
                            completion(.failure(.biometricNotEnrolled))
                        default .biometryNotEnrolled:
                            completion(.failure(.biometricAuthenticationFailed))
                        }
                    } else {
                        completion(.failure(.biometricAuthenticationFailed))
                    }
                }
            }
        } else {
            // Biometric authentication not available
            if let authError = error as? LAError {
                switch authError.code {
                case .biometryNotAvailable:
                    completion(.failure(.biometricNotAvailable))
                case .biometryNotEnrolled:
                    completion(.failure(.biometricNotEnrolled))
                default:
                    completion(.failure(.biometricAuthenticationFailed))
                }
            } else {
                completion(.failure(.biometricAuthenticationFailed))
            }
        }
    }
}

// Example of using biometric authentication
let authenticationManager = BiometricAuthenticationManager()
authenticationManager.authenticateUser { result in 
    switch result {
    case .success:
        print("Biometric authentication successful. Access granted.")
    case .failure(let error):
        print("Biometric authentication failed. Error \(error)")
        // Handle authentication failure
    }
}