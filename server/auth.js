const express = require('express');
const { supabase } = require('./supabase');

const router = express.Router();

// Register Route
router.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;

    // 1. Sign up user in Supabase Auth
    console.log(`[Auth] Attempting sign up for: ${email}`);
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
          role: role || 'freelancer'
        }
      }
    });

    if (authError) {
      console.error('[Auth Error]', authError);
      throw authError;
    }

    console.log('[Auth Success] User ID:', authData.user?.id);

    // 2. Create profile in 'profiles' table
    console.log('[DB] Creating profile...');
    const { error: profileError } = await supabase
      .from('profiles')
      .insert([
        { 
          id: authData.user.id, 
          first_name: firstName, 
          last_name: lastName, 
          email: email,
          role: role || 'freelancer' 
        }
      ]);

    if (profileError) {
      console.error('[DB Error]', profileError);
      // Explicitly return error if profile fails to ensure we don't return "Success" falsely
      return res.status(500).json({ error: 'Profile creation failed. Did you run the SQL script?', details: profileError.message });
    }

    console.log('[DB Success] Profile linked.');

    if (!authData.session) {
      return res.status(201).json({ 
        requireEmailConfirmation: true,
        message: "Registration successful. Please check your email to confirm your account." 
      });
    }

    res.status(201).json({ 
      token: authData.session.access_token, 
      user: { 
        id: authData.user.id, 
        email: authData.user.email, 
        firstName, 
        role: role || 'freelancer' 
      } 
    });
  } catch (error) {
    console.error('Registration Error:', error.message);
    res.status(400).json({ error: error.message });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;

    // Fetch profile data
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', data.user.id)
      .single();

    res.json({ 
      token: data.session.access_token, 
      user: { 
        id: data.user.id, 
        email: data.user.email, 
        firstName: profile?.first_name || 'User', 
        role: profile?.role || 'freelancer' 
      } 
    });
  } catch (error) {
    console.error('Login Error:', error.message);
    res.status(400).json({ error: error.message });
  }
});

// Get Current User
router.get('/me', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'No token' });
    
    const token = authHeader.split(' ')[1];
    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (error || !user) throw new Error('Invalid token');

    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    res.json({ user: { ...user, ...profile } });
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

// Update Profile
router.patch('/profile', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'No token' });
    
    const token = authHeader.split(' ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) throw new Error('Invalid token');

    const { domain, firstName, lastName } = req.body;
    
    const updateData = {};
    if (domain) updateData.domain = domain;
    if (firstName) updateData.first_name = firstName;
    if (lastName) updateData.last_name = lastName;

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .update(updateData)
      .eq('id', user.id)
      .select()
      .single();

    if (profileError) throw profileError;

    res.json({ user: { ...user, ...profile } });
  } catch (error) {
    console.error('Update Profile Error:', error.message);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
