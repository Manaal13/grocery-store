// pages/login.js
import React, { useState } from 'react';
import { Box, Button, Input, FormControl, FormLabel, Select, VStack, Heading } from '@chakra-ui/react';
import { useRouter } from 'next/router';

const roles = ['User', 'Admin', 'Vendor'];

const LoginPage = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('');

  const handleLogin = () => {
    // Dummy data for roles
    const dummyCredentials = {
      User: { username: 'user123', password: 'userpass' },
      Admin: { username: 'admin123', password: 'adminpass' },
      Vendor: { username: 'vendor123', password: 'vendorpass' },
    };

    const roleCredentials = dummyCredentials[selectedRole];

    if (roleCredentials && username === roleCredentials.username && password === roleCredentials.password) {
      // Login successful
      router.push('/');
    } else {
      // Invalid credentials
      console.log('Invalid credentials');
    }
  };

  return (
    <Box p={4}>
      <VStack spacing={4} align="center">
        <Heading>Login Page</Heading>
        <FormControl>
          <FormLabel>Username</FormLabel>
          <Input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Select Role</FormLabel>
          <Select
            placeholder="Select role"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </Select>
        </FormControl>

        <Button colorScheme="blue" onClick={handleLogin}>
          Login
        </Button>
      </VStack>
    </Box>
  );
};

export default LoginPage;
