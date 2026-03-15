
const testAuth = async () => {
    try {
        const timestamp = Date.now();
        const registerRes = await fetch("http://localhost:5000/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: `test_${timestamp}@example.com`,
                firstName: "Test",
                lastName: "User",
                password: "password123",
                role: "freelancer"
            })
        });
        const registerData = await registerRes.json();
        console.log("Register Response:", registerRes.status, registerData);

        if (registerRes.ok) {
            const loginRes = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: `test_${timestamp}@example.com`,
                    password: "password123"
                })
            });
            const loginData = await loginRes.json();
            console.log("Login Response:", loginRes.status, loginData);
        }
    } catch (error) {
        console.error("Test failed:", error);
    }
};

testAuth();
