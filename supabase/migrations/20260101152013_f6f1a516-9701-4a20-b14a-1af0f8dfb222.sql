-- Drop existing policy if exists
DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;

-- Create restrictive SELECT policy that requires authentication and only allows users to see their own roles
CREATE POLICY "Users can view their own roles" 
ON public.user_roles 
FOR SELECT 
TO authenticated
USING (auth.uid() = user_id);