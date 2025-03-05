
import {createClient} from '@/utils/supabase/server'
export default async function Videos() {
    const supabase = await createClient();
    const {data: videos} = await supabase.from('videos').select();

    const handleClick = async () => {
  const { data, error } = await supabase
    .from('videos')
    .insert([{ title: 'New Video', url: 'https://example.com' }]);
};
    
   
    return(
        <div>
            <h1>Video List</h1>
           {videos && <pre>{JSON.stringify(videos, null, 2)}</pre>}
        </div>
   
    )
}


