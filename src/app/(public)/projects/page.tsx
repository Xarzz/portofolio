import { createClient } from '@/lib/supabaseServer';
import ProjectsClient from './ProjectsClient';

export default async function ProjectsPage() {
  const supabase = await createClient();
  
  // Fetch projects from Supabase
  const { data: projects, error } = await supabase
    .from('projects')
    .select('*')
    .order('order', { ascending: true })
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching projects:', error);
  }

  return <ProjectsClient projects={projects || []} />;
}
